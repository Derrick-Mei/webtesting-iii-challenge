// Test away!
import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Controls from "./Controls";

describe("Controls Test", () => {
  it("Contains 2 buttons", () => {
    const wrapper = rtl.render(<Controls />);
    const controlArray = wrapper.getAllByText(/gate/i);

    expect(controlArray.length).toBe(2);
  });

  it("toggleLocked is invoked onClick when gate is closed", () => {
    const toggleLocked = jest.fn();
    const wrapper = rtl.render(<Controls closed={true} toggleLocked={toggleLocked} />);
    const lockButton = wrapper.getByText(/Lock Gate/i);
    rtl.act(() => {
      rtl.fireEvent.click(lockButton);
    });

    expect(toggleLocked).toBeCalled();
  });

  it("toggleLocked is NOT invoked onClick when gate is opened", () => {
    const toggleLocked = jest.fn();
    const wrapper = rtl.render(<Controls closed={false} toggleLocked={toggleLocked} />);
    const lockButton = wrapper.getByText(/Lock Gate/i);
    rtl.act(() => {
      rtl.fireEvent.click(lockButton);
    });
    expect(toggleLocked).not.toBeCalled();
    expect(lockButton).toBeVisible();
  });

  // I'm not gonna lie, very contrived test
  it("toggleClosed is NOT invoked when gate is locked", () => {
    const toggleClosed = jest.fn()
    const wrapper = rtl.render(<Controls locked={true} closed={true} toggleClosed={toggleClosed} />)
    const openGateButton = wrapper.getByText(/open gate/i)
    rtl.act(() => {
      rtl.fireEvent.click(openGateButton)
    })
    expect(toggleClosed).not.toBeCalled();
    expect(openGateButton).toBeVisible();
  })
});
