import { combineReducers } from "redux";

import mockDataService from "../common/data-service";
import { initializeStore } from "../lib/utils/interactor";
import { nexFrame } from "../lib/utils/testing";
import { commands, conferenceRoom, saga } from "./interactor";

jest.spyOn(mockDataService, "fetchAppointments");

describe("Conference Room", () => {
  const mockStore = initializeStore(combineReducers({ conferenceRoom }), saga);
  const date = new Date().toISOString();
  const mockAppointmentData = [{ date, who: "Frank Wilkerson" }];
  mockDataService.fetchAppointments.mockResolvedValue(mockAppointmentData);

  it("should request appointments for a given day", async () => {
    mockStore.dispatch(commands.REQUEST_APPOINTMENTS(date));
    expect(mockDataService.fetchAppointments).toHaveBeenCalledWith(date);

    await nexFrame();

    const { conferenceRoom } = mockStore.getState();
    expect(conferenceRoom.appointments).toEqual(mockAppointmentData);
  });

  it.skip("should create an appointment for a given date, time and duration", () => {});

  it.skip("should cancel a given appointment", () => {});

  it.skip("should re-schedule an appointment for a new date, time, and duration", () => {});
});
