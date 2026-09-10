import React from 'react';
import { Modal, Badge, Button, Group, Text, Paper, Stack, Divider, Progress } from '@mantine/core';
import { IconFileAnalytics, IconStethoscope, IconDownload, IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';

export interface LabReportData {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  labTestId: number;
  labTestName: string;
  labTestCode: string;
  referenceRange: string;
  cost: number;
  testDate: string;
  resultValue: string;
  comments?: string;
  status: string;
  doctorRemarks?: string;
  techRemarks?: string;
  reportFileUrl?: string;
  zoneStatus?: string; // GREEN, YELLOW, RED
  aiSummary?: string;
  healthMetricsJson?: string;
}

interface LabReportDetailModalProps {
  opened: boolean;
  onClose: () => void;
  report: LabReportData | null;
}

export const LabReportDetailModal: React.FC<LabReportDetailModalProps> = ({
  opened,
  onClose,
  report,
}) => {
  if (!report) return null;

  const zone = report.zoneStatus || 'GREEN';
  const isGreen = zone === 'GREEN';
  const isYellow = zone === 'YELLOW';
  const isRed = zone === 'RED';

  // Parse metric numbers for statistics graph
  let observedVal = 50;
  let minRef = 10;
  let maxRef = 100;
  let unit = 'units';

  if (report.healthMetricsJson) {
    try {
      const parsed = JSON.parse(report.healthMetricsJson);
      if (parsed.observed !== undefined) observedVal = parsed.observed;
      if (parsed.minRef !== undefined) minRef = parsed.minRef;
      if (parsed.maxRef !== undefined) maxRef = parsed.maxRef;
      if (parsed.unit) unit = parsed.unit;
    } catch (e) {
      // fallback
    }
  }

  // Calculate visual percentage on spectrum (0 to 100%)
  const minBound = Math.min(minRef * 0.7, observedVal * 0.7);
  const maxBound = Math.max(maxRef * 1.3, observedVal * 1.3);
  const totalRange = maxBound - minBound || 1;
  const positionPct = Math.min(100, Math.max(0, ((observedVal - minBound) / totalRange) * 100));
  const minRefPct = Math.min(100, Math.max(0, ((minRef - minBound) / totalRange) * 100));
  const maxRefPct = Math.min(100, Math.max(0, ((maxRef - minBound) / totalRange) * 100));

  const zoneColor = isRed ? 'red' : isYellow ? 'yellow' : 'teal';
  const zoneTitle = isRed
    ? '🔴 CRITICAL RED ZONE (High Risk)'
    : isYellow
    ? '🟡 WARNING YELLOW ZONE (Attention Required)'
    : '🟢 HEALTHY GREEN ZONE (Normal Limits)';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconFileAnalytics size={20} color="#3B82F6" />
          <Text fw={700} size="md">
            Complete Laboratory Report & AI Statistics
          </Text>
        </Group>
      }
      size="lg"
      centered
      styles={{
        header: { backgroundColor: '#0F172A', color: '#F8FAFC' },
        content: { backgroundColor: '#0F172A', color: '#F8FAFC' },
      }}
    >
      <Stack gap="md">
        {/* AI Health Zone Banner */}
        <Paper
          p="md"
          radius="md"
          style={{
            backgroundColor: isRed ? 'rgba(239, 68, 68, 0.15)' : isYellow ? 'rgba(234, 179, 8, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            border: `1px solid ${isRed ? '#EF4444' : isYellow ? '#EAB308' : '#10B981'}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Badge size="lg" color={zoneColor} variant="filled">
              {zoneTitle}
            </Badge>
            <Text size="xs" c="dimmed">
              Automated AI Clinical Analysis
            </Text>
          </Group>
          <Text size="sm" c="gray.2" style={{ lineHeight: 1.5 }}>
            {report.aiSummary || 'Laboratory diagnostic parameters evaluated against standard clinical limits.'}
          </Text>
        </Paper>

        {/* Complete Report Details */}
        <Paper p="md" radius="md" bg="#1E293B" style={{ border: '1px solid #334155' }}>
          <Text fw={600} size="xs" c="sky.4" tt="uppercase" mb="sm">
            Diagnostic Test Specifications
          </Text>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="gray.3"><b>Patient:</b> {report.patientName}</Text>
            <Text size="sm" c="gray.3"><b>Doctor:</b> {report.doctorName}</Text>
          </Group>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="gray.3"><b>Test Name:</b> {report.labTestName} ({report.labTestCode})</Text>
            <Text size="sm" c="gray.3"><b>Date:</b> {new Date(report.testDate).toLocaleDateString()}</Text>
          </Group>
          <Divider my="xs" color="gray.7" />
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="gray.3">
              <b>Observed Result:</b>{' '}
              <span style={{ color: isRed ? '#F87171' : isYellow ? '#FACC15' : '#4ADE80', fontWeight: 700 }}>
                {report.resultValue || 'Awaiting Quantitative Output'}
              </span>
            </Text>
            <Text size="sm" c="gray.3">
              <b>Reference Range:</b> {report.referenceRange || 'N/A'}
            </Text>
          </Group>

          {report.comments && (
            <Text size="xs" c="gray.4" mt="xs">
              <b>Comments:</b> {report.comments}
            </Text>
          )}
          {report.techRemarks && (
            <Text size="xs" c="gray.4" mt="xs">
              <b>Technician Remarks:</b> {report.techRemarks}
            </Text>
          )}
        </Paper>

        {/* Interactive Statistics Graph */}
        <Paper p="md" radius="md" bg="#1E293B" style={{ border: '1px solid #334155' }}>
          <Text fw={600} size="xs" c="sky.4" tt="uppercase" mb="xs">
            📊 Health Parameter Statistics Spectrum Graph
          </Text>
          <Text size="xs" c="gray.4" mb="md">
            Visual distribution of observed result relative to healthy reference bounds.
          </Text>

          {/* Range Spectrum Bar */}
          <div style={{ position: 'relative', marginTop: '20px', marginBottom: '30px' }}>
            <Progress.Root size="xl" radius="md">
              <Progress.Section value={minRefPct} color="yellow">
                <Progress.Label>Low Risk</Progress.Label>
              </Progress.Section>
              <Progress.Section value={maxRefPct - minRefPct} color="teal">
                <Progress.Label>Normal Green Band</Progress.Label>
              </Progress.Section>
              <Progress.Section value={100 - maxRefPct} color="red">
                <Progress.Label>High Risk</Progress.Label>
              </Progress.Section>
            </Progress.Root>

            {/* Observed Marker Pinpoint */}
            <div
              style={{
                position: 'absolute',
                left: `${positionPct}%`,
                top: '-24px',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Badge size="xs" color={zoneColor} variant="filled">
                {observedVal} {unit}
              </Badge>
              <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${isRed ? '#EF4444' : isYellow ? '#EAB308' : '#10B981'}` }} />
            </div>
          </div>

          <Group justify="space-between" mt="xs">
            <Text size="xs" c="gray.4">Min Bound: {minRef} {unit}</Text>
            <Text size="xs" c="teal.4" fw={700}>Healthy Band ({minRef} - {maxRef})</Text>
            <Text size="xs" c="gray.4">Max Bound: {maxRef} {unit}</Text>
          </Group>
        </Paper>

        {/* Action Buttons */}
        <Group justify="space-between" mt="xs">
          {report.reportFileUrl ? (
            <Button
              variant="light"
              color="violet"
              leftSection={<IconDownload size={14} />}
              onClick={() => {
                const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
                const uploadBase = apiBase.replace(/\/api\/?$/, '');
                window.open(`${uploadBase}${report.reportFileUrl}`, '_blank');
              }}
            >
              Download PDF Report
            </Button>
          ) : (
            <div />
          )}
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
