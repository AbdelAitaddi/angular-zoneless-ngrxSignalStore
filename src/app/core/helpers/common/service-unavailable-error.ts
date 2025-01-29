export class ServiceUnavailableError extends Error {
  serviceName = '';

  constructor(serviceName?: string) {
    super(serviceName + ' service is unavailable');
    this.name = ServiceUnavailableError.name;
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
    this.serviceName = serviceName ?? '';
  }
}
