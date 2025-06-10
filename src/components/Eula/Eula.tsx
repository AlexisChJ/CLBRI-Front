import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

import { Zen_Maru_Gothic } from "next/font/google";

const zen_500 = Zen_Maru_Gothic({
  weight: "500",
  subsets: ["latin"],
  preload: true,
});

export function SheetLeft() {
  return (
    <Sheet key="left">
      <SheetTrigger>
        <span className={`${zen_500.className} text-[#9B9B9B] cursor-pointer underline`}>
          Términos y condiciones
        </span>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>END USER LICENSE AGREEMENT (EULA) DE CLBRÍ</SheetTitle>
            <SheetDescription>
              <strong>Fecha de Vigencia:</strong> 28 Mayo 2025
            </SheetDescription>
          </SheetHeader>

          {/* Área Scrollable */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6 text-sm text-muted-foreground">
              <p>
                Este Acuerdo de Licencia de Usuario Final (“EULA” por sus siglas
                en inglés) es un acuerdo legal entre usted (“Usuario” o “Usted”)
                y el Instituto Tecnológico y de Estudios Superiores de Monterrey
                Campus Ciudad de México, una institución localizada en Prol.
                Canal de Miramontes, Coapa, San Bartolo el Chico, Tlalpan, 14380
                Ciudad de México, CDMX (“Institución” o “Nosotros”), el cual
                norma su uso del Sistema Web CLBRi (“Sistema”).
              </p>
              <p>
                Al acceder o usar el Sistema, usted acepta estar sujeto a este
                EULA. Si usted no está de acuerdo con los términos de este EULA,
                no deberá de acceder o hacer uso del Sistema.
              </p>

              <div>
                <h3 className="text-base font-semibold">
                  1. Concesión de Licencia
                </h3>
                <p>
                  CLBRi le otorga una licencia revocable, no-transferible,
                  no-exclusiva y limitada para usar el Sistema únicamente por
                  razones empresariales en cualquier dispositivo con acceso a
                  internet y capaz de usar un navegador web al que usted tenga
                  acceso o control, sujeto a los términos de este EULA.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">2. Plan de Patrocinios</h3>
                <p>
                  CLBRi es monetizado a través de un plan de patrocinios. Para
                  tener acceso al Sistema, se requiere que usted cumpla con los
                  requisitos mínimos de al menos uno de los niveles de
                  patrocinio que le ofrecemos. El aporte económico se espera una
                  vez cada semestre.
                </p>
                <p>
                  Aparte de tener acceso al Sistema, usted podrá tener derecho a
                  los siguientes beneficios dependiendo del nivel de patrocinio
                  con el que cumpla:
                </p>

                <br />
                <div>
                  <h4 className="font-medium">Nivel 3 ($50,000 o menos)</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Logo de tamaño pequeño en la página de inicio del sistema
                      y en materiales de difusión.
                    </li>
                    <li>
                      Invitación a eventos y foros donde el sistema sea
                      presentado/invitado.
                    </li>
                    <li>Colaboración en campañas de impacto social.</li>
                    <li>
                      Capacitación especial para el personal de la red 1 veces
                      al mes.
                    </li>
                    <li>Certificado de agradecimiento.</li>
                  </ul>
                </div>

                <br />
                <div>
                  <h4 className="font-medium">Nivel 2 ($51,000 - $199,999)</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Logo de tamaño mediano en la página de inicio del sistema
                      y en materiales de difusión.
                    </li>
                    <li>
                      Invitación a eventos y foros donde el sistema sea
                      presentado/invitado.
                    </li>
                    <li>Colaboración en campañas de impacto social.</li>
                    <li>
                      Mención en las RRSS, medios de comunicación y otros medios
                      de difusión (artículos, entrevistas, entre otros).
                    </li>
                    <li>
                      Capacitación especial para el personal de la red 3 veces
                      al mes.
                    </li>
                    <li>Certificado de agradecimiento.</li>
                  </ul>
                </div>

                <br />
                <div>
                  <h4 className="font-medium">Nivel 1 ($200,000 o más)</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Logo destacado en la página de inicio del sistema, logo
                      pequeño en la barra de navegación y en materiales de
                      difusión.
                    </li>
                    <li>
                      Invitación a eventos y foros donde el sistema sea
                      presentado/invitado.
                    </li>
                    <li>
                      Soporte técnico en prioridad principal para resolución de
                      problemas o consultas.
                    </li>
                    <li>Colaboración en campañas de impacto social.</li>
                    <li>
                      Mención en las RRSS, medios de comunicación y otros medios
                      de difusión (artículos, entrevistas, entre otros).
                    </li>
                    <li>
                      Capacitación especial para el personal de la red 6 veces
                      al mes.
                    </li>
                    <li>Certificado de agradecimiento.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold">3. Restricciones</h3>
                <p>Usted se compromete a no:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Vender, transmitir, alojar o explotar comercialmente de
                    cualquier forma el Sistema.
                  </li>
                  <li>
                    Copiar, modificar, distribuir o mostrar públicamente el
                    Sistema, salvo que lo permita expresamente este EULA.
                  </li>
                  <li>
                    Usar el Sistema por cualquier uso que no sea empresarial.
                  </li>
                  <li>
                    Eliminar, alterar u ocultar cualquier aviso de propiedad
                    (incluidos los avisos de derechos de autor y marcas
                    registradas) proporcionados como parte del Sistema.
                  </li>
                  <li>
                    Modificar, desencriptar, compilar a la inversa o hacer
                    ingeniería inversa al Sistema o a cualquiera de sus
                    porciones.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  4. Recolección de Datos Personales
                </h3>
                <p>
                  El sistema recolecta cierta información personal suya,
                  incluyendo pero no limitado a:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Nombre</li>
                  <li>Detalles de contacto</li>
                  <li>Lugar y locación de trabajo</li>
                </ul>
                <p>
                  CLBRi se compromete a cumplir con la Ley Federal de Protección
                  de Datos Personales en Posesión de Particulares (LFPDPPP).
                  Para más detalles sobre cómo se maneja su información, por
                  favor refiérase a nuestra Política de Privacidad.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">5. Propiedad</h3>
                <p>
                  Todos los derechos de propiedad intelectual en y para el
                  Sistema, incluyendo pero no limitado a marcas registradas,
                  logos y cualquier contenido asociado, son propiedad del
                  Instituto Tecnológico y de Estudios Superiores de Monterrey
                  Campus Ciudad de México o sus licenciantes. Sin embargo, CLBRi
                  reconoce que el Sistema, contenidos y marcas registradas no
                  son exclusivas a la Institución.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  6. Actualizaciones y Modificaciones
                </h3>
                <p>
                  El sistema puede, de vez en cuando, proveer actualizaciones
                  independientemente de su operación. Estas actualizaciones
                  pueden incluir arreglos de bugs, nuevas funcionalidades y
                  otras mejoras basadas en la retroalimentación del usuario.
                </p>
                <p>
                  Al usar el Sistema, usted está de acuerdo con que este pueda
                  actualizarse automáticamente. Además, CLBRi opera según un
                  modelo de patrocinios basado en el capital que usted invierta.
                  De acuerdo con el nivel de patrocinio, puede tener derecho a
                  beneficios como:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Capacitación especial para el personal x veces al mes.
                  </li>
                  <li>
                    Soporte técnico en prioridad principal para resolución de
                    problemas o consultas.
                  </li>
                </ul>
                <p>
                  Agradecemos y animamos sus comentarios sobre el Sistema. CLBRi
                  podrá utilizarlos para mejorar el Sistema sin compromiso
                  alguno.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">7. Terminación</h3>
                <p>
                  Este EULA es efectivo hasta que sea terminado por usted o
                  CLBRi. Sus derechos bajo este EULA terminarán automáticamente
                  sin aviso si usted no cumple con cualquiera de los términos.
                  En ese caso, deberá cesar el uso del Sistema y destruir todas
                  las credenciales de acceso en su posesión.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  8. Limitación de Responsabilidad
                </h3>
                <p>
                  En la medida máxima permitida por la ley, CLBRi y sus
                  licenciantes no serán responsables de ningún daño indirecto,
                  incidental, consecuente o especial que surja de o esté
                  relacionado con su uso del Sistema, incluidos daños por
                  pérdida de ganancias, datos u otras pérdidas, incluso si se
                  nos ha advertido de la posibilidad de tales daños.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  9. Información de Contacto
                </h3>
                <p>
                  Si usted tiene alguna pregunta acerca de este EULA, puede
                  contactarnos a través del Sistema en{" "}
                  <a
                    href="https://CLBRi.mx/es/contact"
                    className="text-blue-600 underline"
                  >
                    https://CLBRi.mx/es/contact
                  </a>{" "}
                  o por correo electrónico a{" "}
                  <a
                    href="mailto:clbriContact@itesm.mx"
                    className="text-blue-600 underline"
                  >
                    clbriContact@itesm.mx
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">10. Ley Aplicable</h3>
                <p>
                  Este EULA es gobernado e interpretado de acuerdo con las leyes
                  de México, sin tener en cuenta sus principios de conflicto de
                  leyes.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">11. Misceláneos</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Este EULA constituye el acuerdo completo entre usted y CLBRi
                    en relación con el Sistema.
                  </li>
                  <li>
                    Si alguna disposición de este EULA se considera inaplicable,
                    las disposiciones restantes seguirán en pleno vigor.
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
