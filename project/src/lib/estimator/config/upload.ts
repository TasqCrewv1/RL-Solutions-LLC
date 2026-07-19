export const uploadConfig = {
  accept: ['image/jpeg', 'image/png', 'application/pdf'],
  maxSizeMb: 20,
  maxFiles: 20,
  compressionOptions: {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  },
  contractorEmail: 'jeremiah@example.com',
};

export const emailConfig = {
  contractorEmail: 'jeremiah@example.com',
  fromLabel: 'Project Estimate Bot',
};
