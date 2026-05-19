export const buildDaycareData = (
  formData,
  petVaccinationUrl
) => {

  return {

    formType: "guarderia",

    ownerName:
      formData.get("ownerName"),

    phone:
      formData.get("phone"),

    secondaryPhone:
      formData.get("secondaryPhone"),

    address:
      formData.get("address"),

    idDocument:
      formData.get("idDocument"),

    petName:
      formData.get("petName"),

    petBreed:
      formData.get("petBreed"),

    veterinarianInfo:
      formData.get("veterinarianInfo"),

    petBehavior:
      formData.get("petBehavior"),

    petGender:
      formData.get("petGender"),

    petSpayed:
      formData.get("petSpayed"),

    petSpecialNeeds:
      formData.get("petSpecialNeeds"),

    descriptionSpecialNeeds:
      formData.get(
        "descriptionSpecialNeeds"
      ),

    petVaccinationStatus:
      formData.get(
        "petVaccinationStatus"
      ),

    petFleasTicks:
      formData.get("petFleasTicks"),

    petComfortItems:
      formData.get(
        "petComfortItems"
      ),

    descriptionComfortItems:
      formData.get(
        "descriptionComfortItems"
      ),

    petPlayfulness:
      formData.get("petPlayfulness"),

    descriptionPlayfulness:
      formData.get(
        "descriptionPlayfulness"
      ),

    petFeedingFrequency:
      formData.get(
        "petFeedingFrequency"
      ),

    petSocialization:
      formData.get(
        "petSocialization"
      ),

    descriptionAdditionalInfo:
      formData.get(
        "descriptionAdditionalInfo"
      ),

    petDeclaration:
      formData.get(
        "petDeclaration"
      ),

    petVaccinationUrl,
  };
};