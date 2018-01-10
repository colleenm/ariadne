const titleFont = 'bellefair '
const grayTextColor = 'white-70 '

const styles = {
  'borderedSection': 'ba b--white-80 pa3',
  'button': 'bg-light-green bn black pointer glow ' + titleFont,
  'pagePadding': 'pa3 mw-8',
  'pageTitle': 'f2 mb2 ' + titleFont,
  'grayTitle': 'f4 ' + titleFont + grayTextColor,
  'linkedTitle': 'white f4 ' + titleFont,
  'dullText': grayTextColor,
}

const mobileMenuStyles = {
  'bmBurgerButton': {
    'position': 'fixed',
    'width': '24px',
    'height': '24px',
    'right': '16px',
    'top': '12px',
  },
  'bmCross': {
    'backgroundColor': '#eeeeee',
  },
  'bmMenu': {
    'backgroundColor': '#000',
    'border': '1px solid #eee',
  },
  'bmOverlay': {
    'backgroundColor': 'rgba(0, 0, 0, 0.5)',
    'left': '0',
  },
}

export {styles, mobileMenuStyles}
