import React from 'react'
import PropTypes from 'prop-types'

export const MaterialTailwind = React.createContext(null)
MaterialTailwind.displayName = 'MaterialTailwindContext'

export function reducer(state: any, action: any) {
  switch (action.type) {
    case 'OPEN_SIDENAV': {
      return { ...state, openSidenav: action.value }
    }
    case 'SIDENAV_TYPE': {
      return { ...state, sidenavType: action.value }
    }
    case 'SIDENAV_COLOR': {
      return { ...state, sidenavColor: action.value }
    }
    case 'TRANSPARENT_NAVBAR': {
      return { ...state, transparentNavbar: action.value }
    }
    case 'FIXED_NAVBAR': {
      return { ...state, fixedNavbar: action.value }
    }
    case 'OPEN_CONFIGURATOR': {
      return { ...state, openConfigurator: action.value }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function MaterialTailwindControllerProvider({ children }: any) {
  const initialState = {
    openSidenav: false,
    sidenavColor: 'blue',
    sidenavType: 'dark',
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  }

  const [controller, dispatch] = React.useReducer(reducer, initialState)
  const value: any = React.useMemo(() => [controller, dispatch], [
    controller,
    dispatch,
  ])

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  )
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind)

  if (!context) {
    throw new Error(
      'useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider.',
    )
  }

  return context
}

MaterialTailwindControllerProvider.displayName = 'contexts/index.jsx'

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const setOpenSidenav = (dispatch: any, value: any) =>
  dispatch({ type: 'OPEN_SIDENAV', value })
export const setSidenavType = (dispatch: any, value: any) =>
  dispatch({ type: 'SIDENAV_TYPE', value })
export const setSidenavColor = (dispatch: any, value: any) =>
  dispatch({ type: 'SIDENAV_COLOR', value })
export const setTransparentNavbar = (dispatch: any, value: any) =>
  dispatch({ type: 'TRANSPARENT_NAVBAR', value })
export const setFixedNavbar = (dispatch: any, value: any) =>
  dispatch({ type: 'FIXED_NAVBAR', value })
export const setOpenConfigurator = (dispatch: any, value: any) =>
  dispatch({ type: 'OPEN_CONFIGURATOR', value })
