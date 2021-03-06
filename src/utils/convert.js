// Converts audio to the correct format to be processed by picovoice
function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, index) =>
    array.slice(index * size, index * size + size)
  );
}

module.exports = chunkArray;
