export default async function timeDelay (time) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }