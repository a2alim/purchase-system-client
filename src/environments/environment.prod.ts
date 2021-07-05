export const environment = {
  production: true,
  baseUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
  authApiUrl: '/auth-api',
  oncologyApiUrl: '/oncology-api',
  prescriptionServiceApiUrl: '/prescription-service-api/api',
  diagnosticApiUrl: '/diagnostic-api/api',
  diagnosticApiOnlineUrl: '/diagnostic-api/fapi',
  
  emailApiUrl: '/email-api',
  hrmpApiUrl: '/hrmp-api',
  pharmacyApiUrl: '/pharmacy-api/api',
  radiologyApiUrl: '/radiology-api/api',
  pathologyApiUrl: '/pathology-api/api',
  emergencyCasualtyApiUrl: '/emergency-casualty-api/api',
  doctorNurseStationUrl: '/doctor-nurse-station-api/api',
  //nurseStationUrl: '/nurse-station-api/api',
  doctorStationUrl: '/doctor-station-api/api',
  hospitalApiUrl: '/hospital-api/api',
  hrpayrollApiUrl: '/hr-payroll-api/api',
  materialsManagementApiUrl: '/materials-management-api/api',
  dischargeApiUrl: '/discharge-api/api',
  doctorHandoverApiUrl: '/doctor-handover-api/api',
  oncologyServiceApiUrl: '/oncology-service-api/api',
  onlineAppointmentApiUrl : '/online-appointment-api/fapi',
  onlineAppointmentApiAdminUrl : '/online-appointment-api/api',
  emergencyServiceApiUrl: '/emergency-service-api/api',
  crmAppUrl: '/crm-api/api',

  reportPath: 'ihl',
  layout: '1',
  dischargeReportPath: 'ihl',
  appClientName: 'GLOBAL', // GLOBAL, TELEMEDICINE, POLICE
  appTheme: '', // cmh = '', navy = 'theme1'
  // It's enable Hematology result entry from Differential Count auto calculation and alert when it's value 100% not by this test Group no.
  pathHemeDiffCountTestGroupNoArr: [1055, 1090],
  //===google re-captcha: I'm not a robot========
  reCaptchaIsNeed: true,
  reCaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
};
