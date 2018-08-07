import React from "react"
import styled, { css } from "react-emotion"
import PropTypes from "prop-types"
import dateFns from "date-fns"

import Button from "elements/Button"
import Input from "elements/Input"
import Toggle from "utilities/Toggle"

class FilesWindow extends React.Component {
  static propTypes = {
    addNewFile: PropTypes.func.isRequired,
    changeActiveFile: PropTypes.func.isRequired,
    filesData: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
  }

  state = { newEntryName: "" }

  addNewFile = e => {
    e.preventDefault()

    this.props.addNewFile(this.state.newEntryName)
  }

  render() {
    const { newEntryName } = this.state
    const { filesData, activeIndex, changeActiveFile } = this.props

    return (
      <Toggle>
        {({ on: isAddingNewEntry, toggle }) => (
          <FilesWindowContainer>
            <Button onClick={toggle}>+ New Entry</Button>

            {isAddingNewEntry && (
              <form onSubmit={this.addNewFile} className={formCss}>
                <Input
                  autoFocus
                  type="text"
                  placeholder="Title"
                  value={newEntryName}
                  onChange={e => {
                    this.setState({ newEntryName: e.target.value })
                  }}
                  onBlur={toggle}
                />
              </form>
            )}

            <div className={filesContainerCss}>
              {isAddingNewEntry && <div className={overlayCss} />}

              {filesData.map((file, i) => (
                <FileButton
                  key={i}
                  active={i === activeIndex}
                  onClick={changeActiveFile(i)}
                >
                  <p className="title">{file.name}</p>
                  <p className="date">{formatDate(file.lastModified)}</p>
                </FileButton>
              ))}
            </div>
          </FilesWindowContainer>
        )}
      </Toggle>
    )
  }
}

export default FilesWindow

const FilesWindowContainer = styled.div`
  background-color: ${props => props.theme.backgroundDark};
  border-right: 1px solid ${props => props.theme.backgroundLight};
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`

const FileButton = styled.button`
  padding: 1rem;
  width: 100%;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  text-align: left;
  border: none;
  border-bottom: 1px solid ${props => props.theme.backgroundLight};
  cursor: pointer;
  transition: all 0.3s ease;

  opacity: ${({ active }) => (active ? 1 : 0.4)};
  border-left: ${({ active, theme }) =>
    active ? `4px solid ${theme.primary}` : "none"};

  &:hover {
    opacity: 1;
    border-left: 4px solid ${props => props.theme.primary};
  }

  .title {
    font-weight: 800;
    font-size: 1.4rem;
    margin: 0 0 5px 0;
  }

  .date {
    margin: 0;
    font-size: 1.2rem;
  }
`

const formCss = css`
  padding: 0 1rem 0.5rem 1rem;
`

const filesContainerCss = css`
  position: relative;
  overflow: scroll;
`

const overlayCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`

const formatDate = date => dateFns.format(date, "MMMM Do YYYY")
