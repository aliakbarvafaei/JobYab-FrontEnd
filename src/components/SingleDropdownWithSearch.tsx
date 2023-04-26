import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useOnClickOutside } from "../services/hooks/useOutsideClicker";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  InputBase,
  Grid,
  Typography,
} from "@material-ui/core";

import AngleDown from "../assets/images/NewImage_Job/angle-down-disabled.svg";
import AngleUp from "../assets/images/NewImage_Job/angle-up-golden.svg";
import SearchGray from "../assets/images/NewImage_Job/search-gray.svg";

const useStyle = makeStyles((theme) => ({
  container: { flexGrow: 1 },
  label: ({
    hint,
  }: {
    hint: string | undefined;
    ShowDropdown: boolean;
    isError: boolean | undefined;
    MenuLength: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    scrollColor?: string;
  }) => ({
    fontSize: "0.875rem",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: hint ? "0.25rem" : "0.625rem",
  }),
  hint: {
    fontWeight: 500,
    fontSize: "0.75rem",
    textAlign: "left",
    color: "var(--lightBlack)",
    marginBottom: "0.625rem",
  },
  control: ({
    ShowDropdown,
    isError,
  }: {
    hint: string | undefined;
    ShowDropdown: boolean;
    isError: boolean | undefined;
    MenuLength: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    scrollColor?: string;
  }) => ({
    fontSize: "0.875rem",
    fontWeight: 500,
    width: "100%",
    height: "100%",
    minHeight: "45px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1.125rem 0 0",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    boxShadow: `0  ${theme.palette.grey[50]}`,
    cursor: "pointer",
    borderRadius: 4,
    border: ShowDropdown
      ? `1px solid white`
      : !isError
      ? `1px solid rgba(0, 0, 0, 0.23)`
      : `1px solid ${theme.palette.error.main}`,
    "&:hover": {
      borderColor: "none",
    },
  }),
  option: {
    width: "100%",
    marginTop: "1.5rem",
    padding: 0,
    outline: "none",
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--lightBlack)",
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
    "&:first-child": {
      marginTop: "0rem",
    },
  },
  parentMenuList: ({
    MenuLength,
    isLoading,
  }: {
    hint: string | undefined;
    ShowDropdown: boolean;
    isError: boolean | undefined;
    MenuLength: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    scrollColor?: string;
  }) => ({
    height: isLoading
      ? "3rem"
      : MenuLength
      ? `${MenuLength * 4 + 4}rem`
      : "7rem",
    maxHeight: "15rem",
    overflow: "hidden",
    position: "relative",
    margin: " 0.625rem 0 0",
    boxShadow: "0",
    borderRadius: "0 0 20px 20px",
    border: `1px solid ${theme.palette.primary.main}`,
    background: `${theme.palette.background.paper}`,
    width: "100%",
  }),
  menuList: ({
    scrollColor,
  }: {
    hint: string | undefined;
    ShowDropdown: boolean;
    isError: boolean | undefined;
    MenuLength: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    scrollColor?: string;
  }) => ({
    width: "100%",
    position: "absolute",
    padding: "0.625rem 0.625rem 0",
    top: "0",
    bottom: "0",
    overflowY: "scroll",
    marginBottom: "1rem",
    background: `${theme.palette.background.paper}`,
    "&::-webkit-scrollbar": {
      width: "10px",
      overflow: "hidden",
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.background.paper,
    },
    "&::-webkit-scrollbar-thumb": {
      background: scrollColor ? scrollColor : theme.palette.grey[50],
      borderRadius: "8px",
    },
  }),
  wrapper: {
    height: 0,
  },
  requiredMessage: {
    fontSize: "0.75rem",
    color: theme.palette.secondary.main,
  },
  input: ({
    isDisabled,
  }: {
    hint: string | undefined;
    ShowDropdown: boolean;
    isError: boolean | undefined;
    MenuLength: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    scrollColor?: string;
  }) => ({
    "&::placeholder": {
      color: isDisabled ? theme.palette.grey[800] : theme.palette.text.disabled,
    },
  }),
}));
export interface ISingleDropdownWithSearchProps<T> {
  label?: string;
  hint?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  defaultValue?: IOption<T>;
  defaultSearchValue?: string;
  value?: IOption<T>;
  SearchValue?: string;
  options?: Array<IOption<T>>;
  disabledOptions?: Array<IOption<T>>;
  isDisabled?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  required?: boolean;
  errorMessage?: string;
  onChange: (e: IOption<T> | undefined) => void;
  onSearchInputChange?: (text: string | undefined) => void;
  scrollColor?: string;
}
interface IOption<T> {
  value: T;
  label: string;
  [key: string]: any;
}
const SingleDropdownWithSearch: React.FC<
  ISingleDropdownWithSearchProps<string | number>
> = ({
  label,
  hint,
  placeholder,
  searchPlaceholder,
  defaultValue,
  defaultSearchValue,
  value,
  SearchValue,
  options: initialOptions,
  disabledOptions,
  isDisabled,
  isError,
  isLoading = false,
  required,
  errorMessage,
  onChange,
  onSearchInputChange,
  scrollColor,
}) => {
  const [ShowDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    IOption<string | number> | undefined
  >();
  const [MenuLength, setMenuLength] = useState<number>(0);
  const [Options, setOptions] = useState<
    Array<IOption<string | number>> | undefined
  >(undefined);
  const [, setDefaultSearchValue] = useState<string | undefined>(
    defaultSearchValue
  );
  const [InternalSearchValue, setInternalSearchValue] = useState<
    string | undefined
  >(undefined);
  const inputRef = useRef<HTMLDivElement>(null);
  const classes = useStyle({
    hint,
    ShowDropdown,
    isError,
    MenuLength,
    isDisabled,
    isLoading,
    scrollColor,
  });
  useEffect(() => {
    if (initialOptions && initialOptions?.length > 0) {
      setMenuLength(initialOptions.length);
      setOptions(initialOptions);
    } else {
      setMenuLength(0);
    }
  }, [initialOptions]);
  useEffect(() => {
    (value || defaultValue) && setSelectedItem(value ? value : defaultValue);
  }, [value, defaultValue]);
  useEffect(() => {
    if (SearchValue) {
      handleFilterList(SearchValue);
    } else {
      setDefaultSearchValue(defaultSearchValue);
      handleFilterList(defaultSearchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSearchValue, SearchValue]);
  const handleMenuClick = () => {
    if (isDisabled) {
      setShowDropdown(false);
    } else {
      if (ShowDropdown) {
        setShowDropdown(false);
        setInternalSearchValue("");
        if (SearchValue) {
          setOptions(initialOptions);
        } else {
          setMenuLength(initialOptions?.length || 1);
          handleFilterList(SearchValue);
        }
      } else {
        setShowDropdown(true);
      }
    }
  };
  useOnClickOutside(inputRef, () => {
    setInternalSearchValue("");
    setShowDropdown(false);
    if (SearchValue) {
      handleFilterList(SearchValue);
    } else {
      setOptions(initialOptions);
      setMenuLength(initialOptions?.length || 1);
    }
  });
  const handleListItemClick = (item: IOption<string | number> | undefined) => {
    if (item) {
      disabledOptions?.find((e) => e.value === item.value)
        ? setSelectedItem(selectedItem)
        : setSelectedItem(value ? value : item);
      setShowDropdown(false);
      setInternalSearchValue("");
      onChange(item);
    }
  };
  const handleFilterList = (searchedText: string | undefined) => {
    if (onSearchInputChange) {
      onSearchInputChange(searchedText);
    } else {
      setInternalSearchValue(searchedText);
      if (searchedText) {
        const searchLower = SearchValue
          ? SearchValue.toLocaleLowerCase()
          : searchedText.toLocaleLowerCase();
        const filtered = initialOptions?.filter((option) => {
          if (option.label.toLowerCase().includes(searchLower)) {
            return true;
          } else {
            return false;
          }
        });
        setOptions(filtered);
        setMenuLength(filtered?.length || 1);
      } else {
        if (SearchValue) {
          const filtered = initialOptions?.filter((option) => {
            if (
              option.label
                .toLowerCase()
                .includes(SearchValue.toLocaleLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          });
          setOptions(filtered);
        } else {
          setOptions(initialOptions);
          setMenuLength(initialOptions?.length || 1);
        }
      }
    }
  };
  let ArrowDownIcon = ShowDropdown ? (
    <img src={AngleUp} alt="angleUpPrimary" />
  ) : (
    <img src={AngleDown} alt="angleDownDisabled" />
  );

  let listItem = (
    <p className="text-text-disabled  text-center mt-4 ">!موردی یافت نشد </p>
  );
  if (MenuLength > 0 && Options) {
    if (Options.length > 0) {
      listItem = (
        <List>
          {Options &&
            Options.map((item) => (
              <ListItem
                key={item.value}
                disabled={
                  disabledOptions?.find((e) => e.value === item.value)
                    ? true
                    : false
                }
                selected={item.value === selectedItem?.value}
                onClick={() =>
                  handleListItemClick(
                    !disabledOptions?.find((e) => e.value === item.value)
                      ? item
                      : undefined
                  )
                }
                className={classes.option}
                classes={{ selected: "text-Secondary bg-white" }}
              >
                <ListItemText
                  primaryTypographyProps={{ className: "classes.optionLabel" }}
                  primary={item.label}
                />
              </ListItem>
            ))}
        </List>
      );
    } else {
      setMenuLength(0);
      listItem = (
        <p className="text-text-disabled text-center">موردی یافت نشد </p>
      );
    }
  }
  const options = (
    <div style={{ height: 0, zIndex: 1000, position: "relative" }}>
      <div className={classes.parentMenuList}>
        <div className={classes.menuList}>
          {isLoading ? (
            <p className="text-center text-text-disabled">در حال بارگیری...</p>
          ) : (
            <>
              <InputBase
                placeholder={
                  !searchPlaceholder ? "جستجو ..." : searchPlaceholder
                }
                value={SearchValue ? SearchValue : InternalSearchValue}
                onChange={(e) => {
                  setInternalSearchValue(e.currentTarget.value);
                  handleFilterList(e.currentTarget.value);
                }}
                style={{ border: "2px solid blue", borderRadius: 6 }}
                className="text-text-disabled bg-background-default text-3 h-10 px-2.5 w-full flex"
                endAdornment={<img src={SearchGray} alt="searchBlack" />}
              />
              <div className="mt-2.5">{listItem}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div className={classes.container} ref={inputRef}>
      {label && (
        <div className={classes.label}>
          <label>
            {label}
            {required && (
              <span className={`mr-1 ${classes.requiredMessage}`}>
                ( الزامی )
              </span>
            )}
          </label>
        </div>
      )}
      {hint && <p className={classes.hint}>{hint}</p>}
      <div className={classes.control} onClick={handleMenuClick}>
        <input
          placeholder={!placeholder ? "جستجو" : placeholder}
          className={`bg-white cursor-pointer w-5/6 ${classes.input}`}
          disabled
          value={value ? value?.label : selectedItem?.label}
          onBlur={() => {
            setShowDropdown(false);
          }}
        />
        <IconButton
          disableRipple
          className="outline-none bg-background-paper p-0"
          onClick={handleMenuClick}
        >
          {ArrowDownIcon}
        </IconButton>
      </div>
      <Collapse
        timeout={0}
        in={ShowDropdown}
        classes={{ wrapperInner: classes.wrapper }}
      >
        {options}
      </Collapse>
      {errorMessage && (
        <Grid item className="mt-1">
          <Typography
            color="error"
            style={{
              fontFamily: "IRANSans",
              fontSize: "12px",
              marginLeft: "14px",
              marginRight: "14px",
              marginTop: "3px",
            }}
          >
            {errorMessage}
          </Typography>
        </Grid>
      )}
    </div>
  );
};
export default SingleDropdownWithSearch;
