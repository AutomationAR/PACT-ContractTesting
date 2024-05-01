// getNotification
import { InteractionObject } from "@pact-foundation/pact";
import { HTTPMethods } from "@pact-foundation/pact/src/common/request";

import { getNotification } from "../../../api-services/notification";
import { provider } from "../../helpers/pactSetup";

const notificationResponseBodyMock = {
  notifications: [
    {
      userNotificationId: "f230dba4-1497-4328-557c-08db9a5ac780",
      title: "Upload Failed",
      description: "An error has occurred in processing the file",
      status: "PENDING",
      closeConnetion: true,
      createdOn: "2023-08-11T11:05:00.313",
      messageIndicatorTypeId: "Error",
      notificationErrors: [
        {
          code: "3045",
          text: "There is no data in sheet to update",
          title: "File upload failed",
        },
      ],
    },
    {
      userNotificationId: "4ca3adaf-a6f5-4cf0-557b-08db9a5ac780",
      title: "File Processing",
      description: "Data is being validated",
      status: "PENDING",
      closeConnetion: false,
      createdOn: "2023-08-11T11:05:00.123",
      messageIndicatorTypeId: "Information",
      notificationErrors: [],
    },
    {
      userNotificationId: "a62107bc-8558-48c7-25d9-08db983f4856",
      title: "File uploaded successfully",
      description:
        "Group capacity rules uploaded successfully from excel sheet",
      status: "PENDING",
      closeConnetion: true,
      createdOn: "2023-08-11T12:44:08.893",
      messageIndicatorTypeId: "Success",
      notificationErrors: [],
    },
    {
      userNotificationId: "8c9b4eda-dacc-4dc7-25d8-08db983f4856",
      title: "File validated",
      description:
        "File validated and is currently under process. You will be notified shortly",
      status: "PENDING",
      closeConnetion: false,
      createdOn: "2023-08-11T12:44:08.8",
      messageIndicatorTypeId: "Information",
      notificationErrors: [],
    },
    {
      userNotificationId: "a273ffcd-ddb4-4dc8-25d7-08db983f4856",
      title: "File Processing",
      description: "Data is being validated",
      status: "PENDING",
      closeConnetion: false,
      createdOn: "2023-08-11T12:44:08.5",
      messageIndicatorTypeId: "Information",
      notificationErrors: [],
    },
  ],
  closeConnection: true,
  userName: ".",
  messageSummary: {
    traceId: "0HMSPD1CTMEU8:0000001B",
    messages: [
      {
        title: "Notification Found",
        text: "Notification fetched successfully",
        code: "8001",
        messageIndicatorType: "Information",
        messageDisplayType: "All",
      },
    ],
    isValid: true,
  },
  status: 200,
  statusText: "",
  headers: {
    authorization:
      "Bearer token",
    "content-type": "application/json; charset=utf-8",
  },
};

const interaction: InteractionObject = {
  state: "Request",
  uponReceiving: "Will get the notification",
  withRequest: {
    method: HTTPMethods.GET,
    path: "/notification",
    headers: {
      authorization:
        "Bearer token",
      "content-Type": "application/json; charset=utf-8",
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      authorization:
        "Bearer token",
      "content-Type": "application/json; charset=utf-8",
    },
    body: notificationResponseBodyMock,
  },
};

describe("Pact with Provider", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it("make request", async () => {
    await provider.addInteraction(interaction);

    // request to consumer
    const response = await getNotification();
    expect(response.data).toEqual(notificationResponseBodyMock);
    expect(response.status).toEqual(200);
  });
});
