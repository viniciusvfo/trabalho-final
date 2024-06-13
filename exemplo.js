import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/calcularPlanoSaude")
public class CalcularPlanoSaudeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Obter o IMC do parâmetro da URL
        double imc = Double.parseDouble(request.getParameter("imc"));
        
        // Determinar o plano de saúde ideal com base no IMC
        String planoSaude;
        if (imc < 18.5) {
            planoSaude = "Básico";
        } else if (imc >= 18.5 && imc < 25) {
            planoSaude = "Standard";
        } else {
            planoSaude = "Premium";
        }

        // Enviar a resposta de volta para a página HTML
        response.getWriter().write("Plano de Saúde Ideal: " + planoSaude);
    }
}
