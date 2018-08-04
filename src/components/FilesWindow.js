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
          <div className={filesWindowCss}>
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

const filesWindowCss = css`
  background-color: #140f1d;
  border-right: 1px solid #302b3a;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: -10px 0 20px rgba(0, 0, 0, 0.3) inset;
  }
`

const activeButtonCss = css`
  opacity: 1;
  border-left: 4px solid #82d8d8;
`

const FileButton = styled.button`
  padding: 1rem;
  width: 100%;
  background-color: #191324;
  opacity: 0.4;
  color: #fff;
  text-align: left;
  border: none;
  border-bottom: 1px solid #302b3a;
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
