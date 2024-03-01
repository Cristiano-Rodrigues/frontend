import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function CustomSwitch ({ label, name }: { label: string; name?: string; }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="label" name={name} />
      <Label htmlFor="label">{ label }</Label>
    </div>
  )
}
