import { renderHook, act } from "@testing-library/react-hooks";
import usePuntoReciclajeViewModel from "../crearPRViewModel";

describe("usePuntoReciclajeViewModel - Caminos de prueba", () => {
  it("retorna falso en caso latitud sea nulo", () => {
    const { result } = renderHook(() => usePuntoReciclajeViewModel());

    act(() => {
      result.current.setLatitud(null); // Latitud nula
      result.current.setLongitud("50");
    });

    const isValid = result.current.validarCoordenadas();
    expect(isValid).toBe(false);
    expect(result.current.errorMessage).toBe("La latitud debe estar entre -90 y 90.");
  });

  it("retorna falso en caso latitud sea menor a -90", () => {
    const { result } = renderHook(() => usePuntoReciclajeViewModel());

    act(() => {
      result.current.setLatitud("-91"); // Latitud fuera de rango
      result.current.setLongitud("50");
    });

    const isValid = result.current.validarCoordenadas();
    expect(isValid).toBe(false);
    expect(result.current.errorMessage).toBe("La latitud debe estar entre -90 y 90.");
  });

  it("retorna falso en caso la longitud sea menor a -181", () => {
    const { result } = renderHook(() => usePuntoReciclajeViewModel());

    act(() => {
      result.current.setLatitud("60");
      result.current.setLongitud("-181"); // Longitud fuera de rango
    });

    const isValid = result.current.validarCoordenadas();
    expect(isValid).toBe(false);
    expect(result.current.errorMessage).toBe("La longitud debe estar entre -180 y 180.");
  });

  it("retorna verdadero en caso -90 <= Latitud <= 90 y -180 <= Longitud <= 180", () => {
    const { result } = renderHook(() => usePuntoReciclajeViewModel());

    act(() => {
      result.current.setLatitud("-45");
      result.current.setLongitud("145"); // Coordenadas válidas
    });

    const isValid = result.current.validarCoordenadas();
    expect(isValid).toBe(true);
    expect(result.current.errorMessage).toBe(null);
  });
});
