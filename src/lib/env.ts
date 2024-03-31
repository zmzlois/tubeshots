export function config(key: string) {
  const secret = process.env[key]
  if (!secret) throw Error(`env.config.secret ${key} not found`)
  return secret
}


export const env = {

  "cdn_name": config("CLOUDINARY_NAME"),
  "cdn_api_key": config("CLOUDINARY_API_KEY"),
  "cdn_api_secret": config("CLOUDINARY_API_SECRET"),
  "cdn_url": config("CLOUDINARY_URL"),
  "ut_id": config("UPLOADTHING_APP_ID"),
  "ut_secret": config("UPLOADTHING_SECRET")
}
