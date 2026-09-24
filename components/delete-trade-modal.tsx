"use client";

import type { Trade } from "@/lib/trade-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type DeleteTradeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  trade: Trade | null;
};

const DeleteTradeModal = ({ open, onOpenChange, onConfirm, trade }: DeleteTradeModalProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent
      className="w-[min(600px,calc(100vw-2rem))] gap-5 rounded-2xl border border-[#333f52] bg-[#172033] p-7 text-[#e2ecf6] shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
      showCloseButton={false}
    >
      <DialogTitle className="text-xl font-semibold leading-7 text-[#e2ecf6]">Delete this trade?</DialogTitle>
      <DialogDescription className="text-sm leading-5 text-[#94a3b8]">
        This permanently removes the trade from your journal and cannot be undone.
      </DialogDescription>

      {trade && (
        <div className="flex h-[84px] flex-col gap-1.5 rounded-[10px] border border-[#333f52] bg-[#1e293d] p-4">
          <p className="text-xl font-semibold leading-7 text-[#e2ecf6]">{trade.instrument} · {trade.direction}</p>
          <p className="text-sm leading-5 text-[#94a3b8]">{trade.date} · {trade.result}</p>
        </div>
      )}

      <div className="flex h-11 items-center rounded-lg border border-[#f59e0b] bg-[#1e293d] p-3">
        <p className="text-xs font-medium leading-4 text-[#f59e0b]">This action cannot be undone.</p>
      </div>

      <div className="flex h-11 justify-end gap-3">
        <Button
          className="h-11 w-[88px] border-0 bg-[#1e293d] text-xs text-[#e2ecf6] hover:bg-[#293852]"
          onClick={() => onOpenChange(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className="h-11 w-[118px] border-0 bg-[#f04545] text-xs text-white hover:bg-[#dc3838]"
          onClick={onConfirm}
          type="button"
        >
          Delete trade
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default DeleteTradeModal;
