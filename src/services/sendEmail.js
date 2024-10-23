export const sendEmail = async (mailUrlApi, mailBody) => {
  await fetch(mailUrlApi, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(mailBody),
  });
};
