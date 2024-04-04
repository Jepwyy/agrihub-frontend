import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Badge } from "@components/ui/badge";
import DialogToolCommunicate from "../dialog-tool-request/dialog-tool-communicate";
import { formatDate } from "@components/lib/utils";

export type SeedlingRequest = {
  id: number;
  createdAt: string;
  updatedAt: string;
  farm: string;
  contact: string;
  tool: string;
  quantity_request: number;
  note: string;
  client_note: string;
  accepted_by: string;
  status:
    | "accepted"
    | "pending"
    | "rejected"
    | "forwarded"
    | "communicating"
    | "completed";
};

export const data: SeedlingRequest[] = [
  {
    id: 1,
    createdAt: "2023-01-15",
    updatedAt: "2023-01-15",
    farm: "Sunshine Farm",
    contact: "shenronfarm@gmail.com",
    tool: "Tomato",
    quantity_request: 100,
    note: "kulang kami panggupit ng halaman",
    client_note: "parambalew",
    status: "accepted",
    accepted_by: "Center for Urban and Department of Agriculture"
  },
  {
    id: 2,
    createdAt: "2023-02-20",
    updatedAt: "2023-01-15",
    farm: "Green Acres",
    contact: "shenronfarm@gmail.com",
    tool: "Lettuce",
    quantity_request: 200,
    note: "kulang kami panggupit ng halaman",
    client_note: "parambalew",
    status: "accepted",
    accepted_by: "Center for Urban and Department of Agriculture"
  },
  {
    id: 3,
    createdAt: "2023-03-10",
    updatedAt: "2023-01-15",
    farm: "Golden Fields",
    contact: "shenronfarm@gmail.com",
    tool: "Carrot",
    quantity_request: 150,
    note: "kulang kami panggupit ng halaman",
    client_note: "parambalew",
    status: "accepted",
    accepted_by: "Center for Urban and Department of Agriculture"
  }
];

export const columns: ColumnDef<SeedlingRequest>[] = [
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => <div>{row.getValue("updatedAt")}</div>
  },
  {
    accessorKey: "tool",
    header: "Tool",
    cell: ({ row }) => <div>{row.getValue("tool")}</div>
  },
  {
    accessorKey: "farm",
    header: "Requested by",
    cell: ({ row }) => <div>{row.getValue("farm")}</div>
  },

  {
    accessorKey: "quantity_request",
    header: "Quantity Requested",
    cell: ({ row }) => <div>{row.getValue("quantity_request")}</div>
  },
  {
    accessorKey: "accepted_by",
    header: "Accepted by",
    cell: ({ row }) => <div>{row.getValue("accepted_by")}</div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original;
      const status = request.status;
      const request_date = request.createdAt;
      const farm = request.farm;
      const contact = request.contact;
      const qty = request.quantity_request;
      const rqstr_note = request.note;
      const requested = request.tool;
      const accepted_by = request.accepted_by;

      return (
        <div>
          <Dialog>
            <DialogTrigger className="ml-2 px-2">
              <Button variant="outline" className="rounded-full">
                View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex justify-between gap-4 items-start pt-4">
                  <div>
                    <DialogTitle>Tool Request</DialogTitle>
                    <DialogDescription>
                      Requested: {formatDate(request_date)}
                    </DialogDescription>
                  </div>
                  <Badge className="text-white">{status}</Badge>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="w-full">
                    <Label>Farm Name</Label>
                    <Input type="text" defaultValue={farm} disabled />
                  </div>
                  <div className="w-full">
                    <Label>Contact</Label>
                    <Input type="text" defaultValue={contact} disabled />
                  </div>
                </div>

                <div className="flex w-full gap-4 mb-4">
                  <div className="w-full">
                    <Label>Requested</Label>
                    <Input type="text" defaultValue={requested} disabled />
                  </div>

                  <div className="w-1/3">
                    <Label>Quantity</Label>
                    <Input type="number" defaultValue={qty} disabled />
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Requester Note</Label>
                  <div className="w-full">
                    <Textarea defaultValue={rqstr_note} disabled />
                  </div>
                </div>

                <div className="w-full">
                  <Label>Accepted By:</Label>
                  <Input type="text" defaultValue={accepted_by} disabled />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <DialogToolCommunicate />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
];
