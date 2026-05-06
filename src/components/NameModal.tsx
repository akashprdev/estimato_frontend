import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { motion } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

import { Input } from './ui/input';
import { Button } from './ui/button';

import { User, Sparkles } from 'lucide-react';

export const NameModal = ({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  onSubmit: (name: string) => void;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState('');

  return (
    <Dialog defaultOpen={open} open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl p-0 overflow-hidden">
        <div className="p-8">
          <DialogHeader className="space-y-3">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <User className="text-primary" size={22} />
            </motion.div>

            <DialogTitle className="text-2xl font-black tracking-tight">
              Enter your name
            </DialogTitle>

            <DialogDescription className="text-muted-foreground">
              Choose a name your teammates will see in the session.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-3">
            <Input
              autoFocus
              value={value}
              maxLength={24}
              placeholder="Your name (e.g. Akash)"
              onChange={(e) => setValue(e.target.value)}
              className="h-12 rounded-xl bg-muted/40 border-0 tracking-wide focus-visible:ring-1 focus-visible:ring-primary/40"
            />
          </div>

          <Button
            disabled={!value.trim()}
            onClick={() => onSubmit(value.trim())}
            className="mt-6 w-full h-12 rounded-xl font-extrabold shadow-[0_8px_24px_hsl(var(--primary)/0.35)] flex items-center gap-2"
          >
            <Sparkles size={16} />
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
