// Helper to get the latest service date for an array of service dates
const getLatestServiceDate = (serviceDates) => {
  if (serviceDates ? serviceDates.length === 0 : true) return null;

  return serviceDates.reduce((latest, current) => {
    const latestDate = new Date(latest.date.split("-").reverse().join("-"));
    const currentDate = new Date(current.date.split("-").reverse().join("-"));
    return currentDate > latestDate ? current : latest;
  });
};

// Helper to calculate months between two dates
const monthsBetween = (date1, date2) => {
  let months;
  months = (date2.getFullYear() - date1.getFullYear()) * 12;
  months -= date1.getMonth();
  months += date2.getMonth();
  return months <= 0 ? 0 : months;
};

export const getServiceDueLists = (customers, acLimit = 10, roLimit = 6) => {
  const today = new Date();

  const dueLists = {
    acDue: [],
    roDue: [],
  };
  customers.forEach((customer) => {
    const { _id, name, phone, acServiceDates, roServiceDates } = customer;

    // AC
    const latestACService = getLatestServiceDate(acServiceDates);
    if (latestACService) {
      const months = monthsBetween(
        new Date(latestACService.date.split("-").reverse().join("-")),
        today
      );
      if (months >= acLimit) {
        dueLists.acDue.push({
          _id,
          name,
          phone,
          latestService: latestACService,
          months,
          type: "AC",
        });
      }
    }

    // RO
    const latestROService = getLatestServiceDate(roServiceDates);
    if (latestROService) {
      const months = monthsBetween(
        new Date(latestROService.date.split("-").reverse().join("-")),
        today
      );
      if (months >= roLimit) {
        dueLists.roDue.push({
          _id,
          name,
          phone,
          latestService: latestROService,
          months,
          type: "RO",
        });
      }
    }
  });

  return dueLists;
};

export const getTodayContacts = (contacts) => {
  const today = new Date();
  const formattedToday = today
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");

  function contactHasTodayService(contact) {
    const serviceTypes = [
      ...contact.acServiceDates,
      ...contact.roServiceDates,
      ...contact.fridgeServiceDates,
      ...contact.geyserServiceDates,
      ...contact.wmServiceDates,
    ];

    return serviceTypes.some((service) => service.date === formattedToday);
  }

  // Filter contacts where any service date matches today's date
  const filteredContacts = contacts.filter(contactHasTodayService);

  return filteredContacts;
};

export const getMonthContacts = (contacts) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Month is zero-indexed, so add 1
  const currentYear = today.getFullYear();

  function contactHasCurrentMonthService(contact) {
    const serviceTypes = [
      ...contact.acServiceDates,
      ...contact.roServiceDates,
      ...contact.fridgeServiceDates,
      ...contact.geyserServiceDates,
      ...contact.wmServiceDates,
    ];

    return serviceTypes.some((service) => {
      const [day, month, year] = service.date.split("-").map(Number);
      return month === currentMonth && year === currentYear;
    });
  }

  // Filter contacts where any service date falls within the current month
  const filteredContacts = contacts.filter(contactHasCurrentMonthService);

  return filteredContacts;
};
