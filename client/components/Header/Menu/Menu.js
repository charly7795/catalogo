import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";

export default function MenuWeb(){
    return(
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width= {6}>
                        <MenuPlatforms />
                        
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={10}>
                        <MenuOptions />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
        
}


function MenuPlatforms(){
    return(
        <Menu>
            <Link href="/Bandas">
                <Menu.Item as="a">
                    Bandas
                </Menu.Item>
            </Link>
            <Link href="/Accesorios">
                <Menu.Item as="a">
                    Accesorios
                </Menu.Item>
            </Link>
            <Link href="/Coleccionables">
                <Menu.Item as="a">
                    Coleccionables
                </Menu.Item>
            </Link>
            <Link href="/Vestimenta">
                <Menu.Item as="a">
                    Vestimenta
                </Menu.Item>
            </Link>
           
        </Menu>
    )
}



function MenuOptions(){
    return(
     <Menu>
       <Menu.Item>
        <Icon name="user outline" />
        Mi cuenta 
       </Menu.Item>
    </Menu>
    );
}