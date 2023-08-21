export const sendSlackAlert = async (message: string) => {
    const slackWebhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK

    if (!slackWebhookUrl) {
        console.error('Slack Webhook URLが設定されていません。')
        return;
      }

    const payload = {
        text: message
    }

    await fetch(slackWebhookUrl, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
}