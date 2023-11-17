FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_PORT
ARG DATABASE_HOST
ARG DATABASE_USER
ARG DATABASE_ROOT_PASSWORD
ARG DATABASE_DB
ARG DATABASE_PASSWORD
ARG NEXT_PUBLIC_NEST_URL
ARG NEXT_PUBLIC_SLACK_WEBHOOK
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

ENV DATABASE_PORT=3310
ENV DATABASE_HOST="db"
ENV DATABASE_USER="root"
ENV DATABASE_ROOT_PASSWORD="rootpasswd"
ENV DATABASE_DB="pagespeedinsights"
ENV DATABASE_PASSWORD="passwd"
ENV NEXT_PUBLIC_NEST_URL="https://page-speed-measurement-nextapp-api-oclbewqdfa-an.a.run.app/"
ENV NEXT_PUBLIC_SLACK_WEBHOOK="https://hooks.slack.com/services/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"
ENV NEXTAUTH_URL="https://page-speed-measurement-nextapp-oclbewqdfa-an.a.run.app"
ENV NEXTAUTH_SECRET="tGb+wzZzft6Cd/bIuFczJaUufA2bsfk5VsesAjEGwQw="

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]



#  - name: gcr.io/google.com/cloudsdktool/cloud-sdk
#     args:
#       - '-c'
#       - >-
#         gcloud run deploy $_SERVICE_NAME --image
#         $_AR_HOSTNAME/$PROJECT_ID/cloud-run-source-deploy/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA 
#         --region=$_DEPLOY_REGION --build-arg
#         NEXT_PUBLIC_NEST_URL=$$NEXT_PUBLIC_NEST_URL --build-arg
#         NEXT_PUBLIC_SLACK_WEBHOOK=$$NEXT_PUBLIC_SLACK_WEBHOOK --platform
#         managed 
#     entrypoint: bash
#     secretEnv:
#       - NEXT_PUBLIC_NEST_URL
#       - NEXT_PUBLIC_SLACK_WEBHOOK