import { NextRequest } from 'next/server'
import { runNodeMonitorJob } from '@/src/jobs/node-monitor'
import { jsonOk, jsonError } from '@/src/utils/responses'

export async function GET(request: NextRequest) {
  const secret = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && secret !== `Bearer ${cronSecret}`) {
    return jsonError('Unauthorized', 401)
  }

  const result = await runNodeMonitorJob()
  return jsonOk(result)
}
