import { Resource } from "sst";
import { PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { ebClient } from "..";
import { LazyReaderEventArgs } from "../../functions/utils/types";

export async function sendClientEvent({
  source,
  details,
  detailType
}: {
  source: string;
  detailType: string;
  details: LazyReaderEventArgs
}) {
  await ebClient.send(new PutEventsCommand({
    Entries: [
      {
        EventBusName: Resource.ClientBus.name,
        Source: source,
        DetailType: detailType,
        Detail: JSON.stringify(details)
      }
    ]
  }));
}

export async function sendSummaryEvent({
  source,
  details,
  detailType
}: {
  source: string;
  detailType: string;
  details: LazyReaderEventArgs
}) {
  await ebClient.send(new PutEventsCommand({
    Entries: [
      {
        EventBusName: Resource.SummaryBus.name,
        Source: source,
        DetailType: detailType,
        Detail: JSON.stringify(details)
      }
    ]
  }));
}

