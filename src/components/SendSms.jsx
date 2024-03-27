export async function SendSms(username, userphone, url, additionalData = {}) {
  try {
    const requestBody = {
      firstname: username,
      phone: userphone,
      ...additionalData, // Merge additional data with the default body
    };

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    console.error(err);
  }
}
