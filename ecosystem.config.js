export default {
  apps: [{
    name: 'opriva-bot',
    script: 'src/bot/index.js',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      TELEGRAM_BOT_TOKEN: '8007206953:AAFJSV3LL5gNCq46U-DG06vvHDBkwP6gxM0',
      VITE_APP_URL: 'https://fascinating-sopapillas-2e83d3.netlify.app',
      VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZmJwdnp2c3djaGZ1YXBjeXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3Mzg2MTAsImV4cCI6MjA1MDMxNDYxMH0.416oOy6ImUTnk3yE36nGDxyDuq3Vxzw8qbWx1C7iOBg',
      VITE_SUPABASE_URL: 'https://hvfbpvzvswchfuapcyqh.supabase.co'
    },
    exp_backoff_restart_delay: 100,
    max_restarts: 10,
    restart_delay: 4000,
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}