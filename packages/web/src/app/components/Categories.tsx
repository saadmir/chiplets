import { Fragment, useMemo, useContext } from 'react';
import Chip from '@mui/material/Chip';
import { SvgIconComponent, Adjust } from '@mui/icons-material';
import SensorsIcon from '@mui/icons-material/Sensors';
import BathroomIcon from '@mui/icons-material/Bathroom';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MemoryIcon from '@mui/icons-material/Memory';
import SdCardIcon from '@mui/icons-material/SdCard';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OutputIcon from '@mui/icons-material/Output';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import WebAssetIcon from '@mui/icons-material/WebAsset';

import { CatalogSearchContext, iCatalogSearchContext } from '~web/contexts/CatalogSearchContext';

export interface iCategory {
  icon: SvgIconComponent
  name: string
  disabled?: boolean,
}

export interface iCategories {
  [key: string]: iCategory
}

export const Category = ({ category }: { category: string }) => {
  const { toggleCategory, criteria } = useContext(CatalogSearchContext) as iCatalogSearchContext;
  const CategoryIcon = _Categories[category]?.icon || Adjust;

  const color = useMemo(() => {
    if (_Categories[category]?.disabled) return 'default';
    return criteria?.categories?.length && criteria.categories.includes(category) ? 'success' : 'info'
  }, [criteria]);

  const opacity = useMemo(() => criteria?.categories?.length && !criteria.categories.includes(category) ? 0.75 : 1, [criteria]);

  return (
    <Chip
      key={category}
      sx={{ p: `14px 10px 14px 10px`, opacity }}
      icon={<CategoryIcon sx={{ fontSize: 5, display: _Categories[category]?.disabled ? 'none' : 'block' }} />}
      color={color}
      label={_Categories[category]?.name || category}
      size="small"
      disabled={_Categories[category]?.disabled}
      onClick={() => toggleCategory(category)}
    />
  );
};

export const Categories = ({ categories }: { categories: string[] | undefined } ) => (
  <Fragment>
    {(categories || Object.keys(_Categories)).map(c => (<Category key={c} category={c} />))}
  </Fragment>
);

const _Categories: iCategories = {
  CAT_INTERFACE: {
    icon: WebAssetIcon,
    name: 'Interface'
  },
  CAT_SENSOR: {
    icon: SensorsIcon,
    name: 'Sensor'
  },
  CAT_HUMIDITY: {
    icon: BathroomIcon,
    name: 'Humidty',
    disabled: true,
  },
  CAT_TEMPERATURE: {
    icon: DeviceThermostatIcon,
    name: 'Temperature',
    disabled: true,
  },
  CAT_BIOSENSOR: {
    icon: MedicalServicesIcon,
    name: 'Bio Sensor',
    disabled: true,
  },
  CAT_LIGHT: {
    icon: LightbulbCircleIcon,
    name: 'Light',
    disabled: true,
  },
  CAT_MCU: {
    icon: DeveloperBoardIcon,
    name: 'MCU'
  },
  CAT_PMIC: {
    icon: SettingsPowerIcon,
    name: 'PMIC'
  },
  CAT_RF: {
    icon: LeakAddIcon,
    name: 'RF'
  },
  CAT_MAGNETOMETER: {
    icon: ZoomOutMapIcon,
    name: 'Magentometer',
    disabled: true,
  },
  CAT_BUCK: {
    icon: FormatColorFillIcon,
    name: 'Buck',
    disabled: true,
  },
  CAT_RESET: {
    icon: RestartAltIcon,
    name: 'Reset'
  },
  CAT_SUPERVISOR: {
    icon: SupervisorAccountIcon,
    name: 'Supervisor',
    disabled: true,
  },
  CAT_AUDIO: {
    icon: AudiotrackIcon,
    name: 'Audio'
  },
  CAT_ACCELEROMETER: {
    icon: ShareLocationIcon,
    name: 'Accelerometer',
    disabled: true,
  },
  CAT_MEMORY: {
    icon: MemoryIcon,
    name: 'Memory'
  },
  CAT_FLASH: {
    icon: SdCardIcon,
    name: 'Flash',
    disabled: true,
  },
  CAT_TOUCH: {
    icon: TouchAppIcon,
    name: 'Touch',
    disabled: true,
  },
  CAT_OTHER: {
    icon: DevicesOtherIcon,
    name: 'Other'
  },
  CAT_CLOCKS: {
    icon: AccessTimeIcon,
    name: 'Clocks'
  },
  CAT_GPIO_EXPANDER: {
    icon: OutputIcon,
    name: 'GPIO Expander'
  },
  CAT_AMPLIFIER: {
    icon: OutputIcon,
    name: 'Amplifier'
  },
  CAT_DRIVER: {
    icon: OutputIcon,
    name: 'Driver'
  },
  CAT_MISCELLANEOUS: {
    icon: OutputIcon,
    name: 'Miscellaneous'
  },
  CAT_SWITCHES: {
    icon: OutputIcon,
    name: 'Switch'
  },
  CAT_DATA_ACQUISITION: {
    icon: OutputIcon,
    name: 'Data Acquisition'
  },
  CAT_FPGA:{
    icon: OutputIcon,
    name: 'FPGA'
  }
};
