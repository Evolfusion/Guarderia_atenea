export const buildWalksData = (
  formData,
  petVaccinationUrl
) => {

  return {

    formType: "paseos",

    ownerName:
      formData.get("ownerName"),

    phone:
      formData.get("phone"),

    secondaryPhone:
      formData.get("secondaryPhone"),

    address:
      formData.get("address"),

    emergencyContact:
      formData.get("emergencyContact"),

    petName:
      formData.get("petName"),

    petAge:
      formData.get("petAge"),

    petBreed:
      formData.get("petBreed"),

    petSize:
      formData.get("petSize"),

    petGender:
      formData.get("petGender"),

    petSpayed:
      formData.get("petSpayed"),

    petVaccinationUrl,

    petVaccinationStatus:
      formData.get("petVaccinationStatus"),

    veterinarianInfo:
      formData.get("veterinarianInfo"),

    petSpecialNeeds:
      formData.get("petSpecialNeeds"),

    descriptionSpecialNeeds:
      formData.get("descriptionSpecialNeeds"),

    petBehaviorWithDogs:
      formData.get("petBehaviorWithDogs"),

    petBehaviorWithPeople:
      formData.get("petBehaviorWithPeople"),

    petPullsOnLeash:
      formData.get("petPullsOnLeash"),

    petOffLeash:
      formData.get("petOffLeash"),

    petAggressionHistory:
      formData.get("petAggressionHistory"),

    energyLevel:
      formData.get("energyLevel"),

    walkMode:
      formData.get("walkMode"),

    walkHours:
      formData.get("walkHours"),

    authorizeEmergencyVet:
      formData.get("authorizeEmergencyVet"),

    acceptWalkTerms:
      formData.get("acceptWalkTerms"),

    additionalInfo:
      formData.get("additionalInfo"),

  };

};