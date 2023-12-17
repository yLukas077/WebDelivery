function ValidateProductDescription(description: string): boolean {
    return description.trim().length > 0 && description.trim().length <= 255;
  }
  
  export { ValidateProductDescription };
  