export function hz(value = Number()) {
  if (!value)
    throw new Error('This function requires 1 argument. Received 0.');

  let newValue;

  if (typeof value !== 'number') {
    newValue = parseInt(value);

    if (Number.isNaN(newValue))
      throw new Error('This function requires a number or number as string as an argument.');
  } else {
    newValue = value;
    
    if (Number.isNaN(newValue))
      throw new Error('This function requires a number or number as string as an argument.');
  }
  
  return `${newValue} Hz`;
}

