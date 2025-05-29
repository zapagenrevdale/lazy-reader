import { looseUrlSchema } from "@/schemas"

export async function getText(url: string) {
  try {
    const validUrl = looseUrlSchema.parse(url);
    const response = await fetch(validUrl)
    return await response.text()
  } catch (e) {
    console.log(e)
    return ""
  }
}
