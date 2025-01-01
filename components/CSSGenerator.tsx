import { DesignConfig, Element } from './FlexiGrid'

export function CSSGenerator(designConfig: DesignConfig): string {
  const { gridColumns, breakpoints, elements, colorScheme, typography } = designConfig

  const generateElementCSS = (element: Element, selector: string = ''): string => {
    const elementSelector = selector ? `${selector} > .${element.id}` : `.${element.id}`
    let css = `
${elementSelector} {
  width: ${element.styles.width};
  height: ${element.styles.height};
  padding: ${element.styles.padding};
  margin: ${element.styles.margin};
  background-color: ${element.styles.backgroundColor};
}
`

    element.children.forEach((child) => {
      css += generateElementCSS(child, elementSelector)
    })

    return css
  }

  const generateGridCSS = () => {
    return `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${gridColumns}, 1fr);
  gap: 10px;
}
`
  }

  const generateTypographyCSS = () => {
    return `
body {
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  line-height: ${typography.lineHeight};
  color: ${colorScheme.text};
  background-color: ${colorScheme.background};
}
`
  }

  const generateResponsiveCSS = () => {
    const breakpointEntries = Object.entries(breakpoints)
    return breakpointEntries
      .map(([key, value], index) => {
        const nextBreakpoint = breakpointEntries[index + 1]
        const maxWidth = nextBreakpoint ? nextBreakpoint[1] - 1 : ''
        const mediaQuery = maxWidth
          ? `@media (min-width: ${value}px) and (max-width: ${maxWidth}px)`
          : `@media (min-width: ${value}px)`

        return `
${mediaQuery} {
  .grid-container {
    grid-template-columns: repeat(${key === 'mobile' ? 1 : key === 'tablet' ? 2 : gridColumns}, 1fr);
  }
}
`
      })
      .join('\n')
  }

  return `
/* FlexiGrid Generated CSS */

${generateTypographyCSS()}
${generateGridCSS()}
${elements.map((element) => generateElementCSS(element)).join('\n')}
${generateResponsiveCSS()}
`
}

