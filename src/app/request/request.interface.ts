export interface RequestInterface {
  title: string | null;
  message: string | null;
  isFailure: boolean;
  isLoading: boolean;
  isValidationError: boolean;
  isClose: boolean;
  saveSuccess: boolean;
  deletedSuccess: boolean;
  isInvalidToken: boolean;
}

export interface RequestPayloadInterface {
  message: string | null;
  title?: string | null;
}
