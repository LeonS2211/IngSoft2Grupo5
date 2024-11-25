const originalConsoleError = console.error;

// eslint-disable-next-line no-undef
jest.spyOn(console, "error").mockImplementation((message, ...args) => {
  if (
    message &&
    typeof message === "string" &&
    message.includes("ReactDOM.render is no longer supported in React 18")
  ) {
    // Ignora este mensaje específico
    return;
  }

  // Para todos los demás mensajes, llama al original
  originalConsoleError(message, ...args);
});
