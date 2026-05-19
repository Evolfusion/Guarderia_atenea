export const useSubmitForm = () => {

  const submitForm = async (
    dataToSend
  ) => {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxdV3jc741f87a85_OqPfMVKeiAcz1xumVNkd3yVeTZAfrbfwmE0rV8QINDbxO-LOu4/exec",
      {
        method: "POST",

        body: new URLSearchParams(
          dataToSend
        ),
      }
    );

    const result =
      await response.json();

    return result;
  };

  return { submitForm };
};