async function getHazardAssessment(longitude: number, latitude: number) {
  const response = await fetch(
    'https://api.georisk.gov.ph/api/assessments/hazards',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQyZWM0YS01YjJmLTRiYmMtYjM3MS0zMTAyNDU5Y2FiZjIiLCJqdGkiOiJlMTc1MmVjNDg5NTcxMWYxMWRhNDFlODk3YTE4N2E4ZmVlMThjYzYyYzQwNTVjNjZlNTllZGY4MGI5Yjg0YTlhYTI0YjdhMzA5M2E5MThlZiIsImlhdCI6MTY4MDg1MDg2NCwibmJmIjoxNjgwODUwODY0LCJleHAiOjE2ODIwNjA0NjQsInN1YiI6IiIsInNjb3BlcyI6WyJhbmFseXRpY3MiLCJhc3Nlc3NtZW50cyIsImRvd25sb2FkLW1hcHMiLCJldmVudHMtbW9kdWxlIiwiZ2VuZXJhbC1zZXR0aW5ncyIsImhoLXNldHRpbmdzIiwibW9uaXRvcmluZy1tb2R1bGUiLCJib3VuZGFyaWVzIiwicmVwb3J0cyJdfQ.dKV1kOvQoirzYkGC8WRbd8R6D7u_KvNPgNn4SyUtUKntNUU5tVGiUYigA8oGPmWjSVImi959GFOECUXZHTvm_9cjV7tjJ6Go2iaQWMGRBZ3k1FuXdbQX6ZCPxSDEGPOQPVL740mA69WMjpj0B2MTc7EcnSNnn33k79ZSb1fcRHGvuOdECGrnG7_MFzTBkfC-1m2oPnPcKBiXJw2-JG5ZuxGepRbGMpQM4datugPaqtgh7Usslst-QCF1S84mn7sbW3cZftHRzM2CU_0IZKSHRcqB2s7htR3fIEwAhtTug4tSMir6YeP7HcHOSPefpPF-utQhHvnv-B7dfvZU59pTJgrRD4mm-AQNoQt-5KLvbmC48kzfLGzORuxFNcaSL31Voj8rqtBRO5OFk6FzEjMcQifpMDjwet5WHjveFVfMRD1GA8ltBhuI616wE3dGdNZYxMyYtx5wMEbr0r83PsKYBTwWnviauYnxnrEnqhX5ubbiU6Top-s40G-2YgNhg-PAPQi9ktPtOlQNKqsZ3tgrs9eXP7rhazxfrRg_dVjPlLLh3SLahYquzacfCTvZoluLBdopWgq_pDiT-2HTd9bD1FQO6IE68SEeXrEeZkoq3uYyQIbQ8TX7vlTNlPcE1Skmop3H8_8yX-T7UpOKBbNiraJaqWr1wX4wdkIi1DTVrIo'
      },
      body: `latitude=${latitude}&longitude=${longitude}`
    }
  );

  return await response.json();
}
