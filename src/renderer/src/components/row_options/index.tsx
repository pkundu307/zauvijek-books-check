import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine, RiMore2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

type RowOptionsPropsType = {
  type?: string
  row?: any
  onDelete?: any
}

export function RowOptions({ row, type, onDelete }: RowOptionsPropsType) {
  return (
    <Menu>
      <MenuButton>
        <RiMore2Fill size={'18px'} />
      </MenuButton>
      <MenuList boxShadow="lg" minWidth={'150px'} rounded={0}>
        <MenuGroup>
          <Link to={`/${type}/${row?.id}/view`}>
            <MenuItem my={0} fontSize="sm" icon={<RiEyeLine size="14px" />}>
              View
            </MenuItem>
          </Link>
          <Link to={`/${type}/${row?.id}/edit`}>
            <MenuItem my={0} fontSize="sm" icon={<RiEdit2Line size="14px" />}>
              Edit
            </MenuItem>
          </Link>
          <MenuDivider my={1} />
          <MenuItem
            my={0}
            fontSize="sm"
            color={'red.500'}
            icon={<RiDeleteBin6Line size="14px" />}
            onClick={() => onDelete(row?.id)}
          >
            Delete
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
