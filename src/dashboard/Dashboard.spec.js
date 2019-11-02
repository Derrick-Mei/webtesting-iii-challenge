// Test away
import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";

// import Display from "../display/Display";
// import Controls from "../controls/Controls";

describe("Dashboard Tests", () => {
  it("Contains Both Components", () => {
    const wrapper = rtl.render(<Dashboard />);
    const panelArray = wrapper.queryAllByTestId("panel");
    expect(panelArray.length).toBe(2);
  });

  it("Has 2 buttons", () => {
    const wrapper = rtl.render(<Dashboard />);
    const buttonsArray = wrapper.queryAllByRole("button");
    expect(buttonsArray.length).toBe(2);
  });

  it("has default state of (Unlocked, Open, Lock Gate, Close Gate)", () => {
    const { getByText } = rtl.render(<Dashboard />);

    expect(getByText("Unlocked"));
    expect(getByText("Open"));
    expect(getByText("Lock Gate"));
    expect(getByText("Close Gate"));
  });

  it("Gate Button Changes Gate display", () => {
    const wrapper = rtl.render(<Dashboard />);
    const gateStatus = wrapper.getByText(/open/i);
    const gateButton = wrapper.getByText(/close gate/i)

    expect(rtl.getNodeText(gateStatus)).toMatch(/open/i)

    rtl.fireEvent.click(gateButton);
    expect(wrapper.getByText(/closed/i))

    rtl.fireEvent.click(gateButton);
    expect(wrapper.getByText(/open/i))
  });

  it('Lock Button Changes Lock Display When Gate is Closed', () => {
    const wrapper = rtl.render(<Dashboard />)
    const lockStatus = wrapper.getByText(/unlocked/i);
    const lockButton = wrapper.getByText(/lock gate/i)
    const gateButton = wrapper.getByText(/close gate/i)

    expect(rtl.getNodeText(lockStatus)).toMatch(/unlocked/i)

    // You have to close the gate before you can lock the gate
    rtl.fireEvent.click(gateButton)
    rtl.fireEvent.click(lockButton);
    expect(rtl.getNodeText(lockStatus)).toMatch(/locked/i)

    rtl.fireEvent.click(lockButton);
    expect(rtl.getNodeText(lockStatus)).toMatch(/unlocked/i)
  })
});
