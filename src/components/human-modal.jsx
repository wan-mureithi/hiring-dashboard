'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function HumanScoreModal({ open, onOpenChange, recordId }) {
  const [rating, setRating] = useState('')
  const [reasoning, setReasoning] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  console.log('this>>', recordId)
  const submit = async () => {
    setLoading(true)
    try {
      await fetch(`http://127.0.0.1:8000/score/human/${recordId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_rating: parseFloat((rating / 10) * 100),
          user_reasoning: reasoning,
        }),
      })
      toast({
        title: 'Human score submitted',
        duration: 2000,
        variant: 'success',
      })
      //toast.success('Human score submitted')
      onOpenChange(false)
    } catch (e) {
      toast({
        title: 'Failed to submitted',
        duration: 2000,
        variant: 'destructive',
      })
      //toast.error('Failed to submit score')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Human Score</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="rating">Rating (1–10)</Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Label htmlFor="reasoning">Reasoning</Label>
          <Textarea
            id="reasoning"
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
