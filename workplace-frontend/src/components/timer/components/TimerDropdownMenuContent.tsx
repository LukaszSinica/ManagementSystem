import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { EditableRows } from '../Timer';


type TimerDropdownMenuContentType = {
  isEditable: boolean, 
  rowId: number, 
  handleDeleteTimer: (rowId: number) => void, 
  saveEdit: (owId: number) => void, 
  disableRowEditing: (rowId: number) => void, 
  handleEditRow: (rowId: number) => void
}

export default function TimerDropdownMenuContent({isEditable, rowId, handleDeleteTimer, saveEdit, disableRowEditing, handleEditRow}: TimerDropdownMenuContentType ){

  return (
    <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem
      onClick={() => handleDeleteTimer(rowId)}
    >
      Delete
    </DropdownMenuItem>
    {isEditable ? 
      <>
        <DropdownMenuItem onClick={() => saveEdit(rowId)}>Save</DropdownMenuItem>
        <DropdownMenuItem onClick={() => disableRowEditing(rowId)}>Stop editing</DropdownMenuItem>
      </>
      :
      <DropdownMenuItem onClick={() => handleEditRow(rowId)}
      > 
        Edit
      </DropdownMenuItem>
    }
  </DropdownMenuContent>
  )
}
