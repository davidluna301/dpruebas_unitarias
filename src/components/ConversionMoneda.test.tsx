import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConversionMoneda from "./ConversionMoneda";

describe("ConversionMoneda Component", () => {
  beforeEach(() => {
    // Mock localStorage
    let store: Record<string, string> = {};
    const localStorageMock = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  test("convierte correctamente de COP a USD", () => {
    render(<ConversionMoneda />);

    const input = screen.getByTestId("input-cop") as HTMLInputElement;
    const select = screen.getByTestId("select-moneda");
    const button = screen.getByRole("button", { name: /convertir/i });

    fireEvent.change(input, { target: { value: "10000" } });
    fireEvent.change(select, { target: { value: "USD" } });
    fireEvent.click(button);

    const result = screen.getByTestId("resultado");
    expect(result).toHaveTextContent("10,000 COP = 2.6000 USD");
  });

  test("persiste el valor en localStorage", () => {
    render(<ConversionMoneda />);

    const input = screen.getByTestId("input-cop") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /convertir/i });

    fireEvent.change(input, { target: { value: "5000" } });
    fireEvent.click(button);

    expect(localStorage.getItem("valor-cop")).toBe("5000");
  });
});
