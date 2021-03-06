import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CheckBox from 'src/components/CheckBox';
import Grid from 'src/components/Grid';
import RenderGuard from 'src/components/RenderGuard';

type ClassNames = 'root'
  | 'flex'
  | 'title'
  | 'divider'
  | 'lastItem'
  | 'inner'
  | 'panelBody'
  | 'label'
  | 'subLabel'
  | 'caption';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme & Linode.Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.color.white,
  },
  flex: {
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
  divider: {
    marginTop: theme.spacing.unit,
  },
  lastItem: {
    paddingBottom: '0 !important',
  },
  inner: {
    padding: theme.spacing.unit * 3,
  },
  panelBody: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit}px`,
  },
  label: {
    '& > span:last-child': {
      color: theme.color.headline,
      fontWeight: 700,
      lineHeight: '1.2em',
      [theme.breakpoints.up('md')]: {
        marginLeft: 16,
      },
    },
  },
  subLabel: {
    display: 'inline-block',
    position: 'relative',
    top: 3,
  },
  caption: {
    marginTop: -8,
    paddingLeft: 39,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 55,
    },
  },
});

const styled = withStyles(styles, { withTheme: true });

interface Props {
  backups: boolean;
  backupsMonthly: number | null;
  privateIP: boolean;
  changeBackups: () => void;
  changePrivateIP: () => void;
}

type CombinedProps = Props & WithStyles<ClassNames>;

class AddonsPanel extends React.Component<CombinedProps> {
  renderBackupsPrice() {
    const { classes, backupsMonthly } = this.props;

    return backupsMonthly && (
      <Grid item className={classes.subLabel}>
        <Typography variant="caption">
          {`$${backupsMonthly.toFixed(2)}`} per month
        </Typography>
      </Grid>
    );
  }

  render() {
    const { classes, changeBackups, changePrivateIP } = this.props;

    return (
      <Paper className={classes.root} data-qa-add-ons>
        <div className={classes.inner}>
          <Typography role="header" variant="title" className={classes.title} >Optional Add-ons</Typography>
          <Grid container>
            <Grid item xs={12}>
              <FormControlLabel
                className={classes.label}
                control={
                  <CheckBox
                    checked={this.props.backups}
                    onChange={() => changeBackups()}
                  />
                }
                label="Backups"
              />
              {this.renderBackupsPrice()}
              <Typography variant="caption" className={classes.caption}>
                Three backup slots are executed and rotated automatically: a daily backup, a 2-7
                day old backup, and an 8-14 day old backup. Plans are priced according to the
                Linode plan selected above.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.divider}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.lastItem}>
              <FormControlLabel
                className={classes.label}
                control={
                  <CheckBox
                    checked={this.props.privateIP}
                    onChange={() => changePrivateIP()}
                  />
                }
                label="Private IP (Free!)"
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default styled(RenderGuard<CombinedProps>(AddonsPanel));
