# === ETAPA 1: Instalación de dependencias ===
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de empaquetado para aprovechar la caché de capas de Docker
COPY package.json package-lock.json* ./
RUN npm ci

# === ETAPA 2: Compilación de la aplicación ===
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js recopila datos de telemetría anónimos de forma predeterminada. Desactívalo aquí:
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# === ETAPA 3: Imagen de producción ligera ===
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear un usuario del sistema sin privilegios para mitigar riesgos de seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar los artefactos públicos y la carpeta de assets estáticos
COPY --from=builder /app/public ./public

# Configurar permisos correctos para la caché de Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar el resultado de la compilación optimizada
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]