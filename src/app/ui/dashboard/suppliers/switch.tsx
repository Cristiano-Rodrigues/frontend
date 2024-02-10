import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function CustomSwitch ({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="label" />
      <Label htmlFor="label">{ label }</Label>
    </div>
  )
}
