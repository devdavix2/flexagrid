import { DesignConfig } from '../App'

export function CSSGenerator(designConfig: DesignConfig): string {
  const { gridColumns, breakpoints, elements } = designConfig

  const generateGridCSS = () => {
    return `
      .grid-container {
        display: grid;
        grid-template-columns: repeat(${gridColumns}, 1fr);
        grid-template-rows: ${elements.header.height} 1fr ${elements.footer.height};
        min-height: 100vh;
      }
    `
  }

  const generateElementCSS = () => {
    return `
      .header {
        grid-column: 1 / -1;
        height: ${elements.header.height};
      }

      .footer {
        grid-column: 1 / -1;
        height: ${elements.footer.height};
      }

      .sidebar {
        width: ${elements.sidebar.width};
      }

      .content {
        padding: ${elements.content.padding};
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
            grid-template-columns: repeat(${
              key === 'mobile' ? 1 : key === 'tablet' ? 2 : gridColumns
            }, 1fr);
          }

          .sidebar {
            grid-column: ${key === 'mobile' ? '1 / -1' : 'auto'};
          }

          .content {
            grid-column: ${key === 'mobile' ? '1 / -1' : 'auto'};
          }
        }
      `
      })
      .join('\n')
  }

  return `
    /* FlexiGrid Generated CSS */

    ${generateGridCSS()}
    ${generateElementCSS()}
    ${generateResponsiveCSS()}
  `
}

