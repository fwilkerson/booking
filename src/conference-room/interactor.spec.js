import { combineReducers } from "redux";

import mockDataService from "../common/data-service";
import { initializeStore } from "../lib/utils/interactor";
import { nexFrame } from "../lib/utils/testing";
import { commands, conferenceRoom, saga } from "./interactor";

jest.spyOn(mockDataService, "fetchAppointments");

describe("Conference Room", () => {
  const today = new Date().toISOString();
  const mockAppointmentData = [{ date: today, who: "Frank Wilkerson" }];
  const mockStore = initializeStore(combineReducers({ conferenceRoom }), saga);

  it("should request appointments for a given day", async () => {
    mockDataService.fetchAppointments.mockResolvedValue(mockAppointmentData);
    mockStore.dispatch(commands.REQUEST_APPOINTMENTS(today));

    let state = mockStore.getState();
    expect(state.conferenceRoom.isBusy).toBe(true);
    expect(mockDataService.fetchAppointments).toHaveBeenCalledWith(today);

    await nexFrame();

    state = mockStore.getState();
    expect(state.conferenceRoom.isBusy).toBe(false);
    expect(state.conferenceRoom.appointments).toEqual(mockAppointmentData);
  });

  it.skip("should create an appointment for a given date, time and duration", () => {});

  it.skip("should cancel a given appointment", () => {});

  it.skip("should re-schedule an appointment for a new date, time, and duration", () => {});
});
