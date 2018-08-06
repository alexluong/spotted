import React from "react"
import styled, { css } from "react-emotion"
import PropTypes from "prop-types"
import dateFns from "date-fns"

import Button from "elements/Button"
import Input from "elements/Input"
import Toggle from "utilities/Toggle"
import Color from "utilities/Color"

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
          <div className={containerCss}>
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
          </div>
        )}
      </Toggle>
    )
  }
}

export default FilesWindow

const containerCss = css`
  background-color: ${Color.get("backgroundDark")};
  border-right: 1px solid ${Color.get("backgroundLight")};
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`

const activeButtonCss = css`
  opacity: 1;
  border-left: 4px solid ${Color.get("primary")};
`

const FileButton = styled.button`
  padding: 1rem;
  width: 100%;
  background-color: ${Color.get("background")};
  opacity: 0.4;
  color: ${Color.get("text")};
  text-align: left;
  border: none;
  border-bottom: 1px solid ${Color.get("backgroundLight")};
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ active }) => active && activeButtonCss};

  &:hover {
    ${activeButtonCss};
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
